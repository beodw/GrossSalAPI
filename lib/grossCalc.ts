import { TaxBrackets, PensionTiers } from "./types";
import {round} from "./utils";

const findHighesTaxBracket = (net:number, taxBrackets: TaxBrackets) => {
  let taxBracketsCount = 0;
  //   Iterate over tax brackets to find largest applicable tax bracket based on net salary
  for (let tb of taxBrackets) {
    if (net < tb.val) {
      return taxBracketsCount - 1;
    }
    taxBracketsCount++;
    net = net - tb.val;
  }
  return taxBracketsCount - 1;
};

const sumAllTaxBracketsBelow = (
  highestTaxBracketIndex: number,
  taxBrackets: TaxBrackets,
  ps = 0,
  i = 0
): number  => {
  if (i == highestTaxBracketIndex) return ps;
  ps += taxBrackets[i].val;
  i++;
  return sumAllTaxBracketsBelow(highestTaxBracketIndex, taxBrackets, ps, i);
};

const sumAllTaxableAmntsBelow = (
  highestTaxBracketIndex: number,
  taxBrackets: TaxBrackets,
  ps = 0,
  i = 0
): number => {
  if (i == highestTaxBracketIndex) return ps;
  ps += taxBrackets[i].rate * taxBrackets[i].val;
  i++;
  return sumAllTaxableAmntsBelow(highestTaxBracketIndex, taxBrackets, ps, i);
};

const getGross = (net: number, allowances: number, taxBrackets: TaxBrackets, pensionTier: PensionTiers) => {
  // Algorithm:
  // If net is less than first tax bracket return immediately since all values can be calculated trivially
  if (net <= taxBrackets[0].val)
    return {basicSalary: net, gross: net + allowances, paye:0, employeeContrib: pensionTier.employeeContrib * net, employerContrib: pensionTier.employerContrib * net};
  // Find highest applicable tax bracket
  let highestTaxBracketIndex = findHighesTaxBracket(net, taxBrackets);
  // Get divisor
  let divisor = 1 - taxBrackets[highestTaxBracketIndex].rate;
  //
  let sum =
    -sumAllTaxBracketsBelow(highestTaxBracketIndex, taxBrackets) *
    taxBrackets[highestTaxBracketIndex].rate;
  //
  let sumOfTaxableAmnts = sumAllTaxableAmntsBelow(
    highestTaxBracketIndex,
    taxBrackets
  );
  //
  sum = sumOfTaxableAmnts + sum;
  // Calculate basic salary
  let basicSalary = (net + sum) / divisor;
  // Calculate gross
  let gross = basicSalary + allowances;
  // Calculate PAYE
  let paye = gross - net;
  // Employee and Employer pension contrib
  let employeeContrib = gross * pensionTier.employeeContrib;
  let employerContrib = gross * pensionTier.employerContrib;

  // Round all figures to 2 decimal places
  let numDeicmalPlaces = 2
  basicSalary = round({val:basicSalary, decimalPlaces: numDeicmalPlaces})
  gross = round({val:gross, decimalPlaces: numDeicmalPlaces})
  paye = round({val:paye, decimalPlaces: numDeicmalPlaces})
  employeeContrib = round({val:employeeContrib, decimalPlaces: numDeicmalPlaces})
  employerContrib = round({val:employerContrib, decimalPlaces: numDeicmalPlaces})

  return { basicSalary, gross, paye, employeeContrib, employerContrib };
};

export default getGross;

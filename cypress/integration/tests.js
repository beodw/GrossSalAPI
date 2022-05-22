/// <reference types="cypress" />

describe("Test a value for each tax band", () => {
  // Test Tax band 1
  it("Should calculate the correct values for tax band 1 with inputs net=300, pensionTier= tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=300&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 300
        expect(response.body).property("basicSalary").to.be.eq(300);
        // Check that gross salary is 300
        expect(response.body).property("gross").to.be.eq(300);
        // Check that paye is 0
        expect(response.body).property("paye").to.be.eq(0);
        // Check that employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that employeeContrib is 39
        expect(response.body).property("employerContrib").to.be.eq(39);
      }
    );
  });
  // Test Tax band 2
  it("Should calculate the correct values for tax band 2 with inputs net=500, pensionTier= tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=500&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 1600
        expect(response.body).property("basicSalary").to.be.eq(507.11);
        // Check that gross salary is 507.11
        expect(response.body).property("gross").to.be.eq(507.11);
        // Check that paye is 7.11
        expect(response.body).property("paye").to.be.eq(7.11);
        // Check that employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that employerContrib is 65.92
        expect(response.body).property("employerContrib").to.be.eq(65.92);
      }
    );
  });
  // Test Tax band 3
  it("Should calculate the correct values for tax band 3 with inputs net=1482, pensionTier=tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=1482&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 1600
        expect(response.body).property("basicSalary").to.be.eq(1600);
        // Check that gross salary is 1600
        expect(response.body).property("gross").to.be.eq(1600);
        // Check that paye is 118
        expect(response.body).property("paye").to.be.eq(118);
        // Check that paye is employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that paye is employerContrib is 208
        expect(response.body).property("employerContrib").to.be.eq(208);
      }
    );
  });

  // Test Tax band 4
  it("Should calculate the correct values for tax band 4 with inputs net=6000, pensionTier=tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=6000&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 7166.82
        expect(response.body).property("basicSalary").to.be.eq(7166.82);
        // Check that gross salary is 7166.82
        expect(response.body).property("gross").to.be.eq(7166.82);
        // Check that paye is 1166.82
        expect(response.body).property("paye").to.be.eq(1166.82);
        // Check that paye is employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that paye is employerContrib is 931.69
        expect(response.body).property("employerContrib").to.be.eq(931.69);
      }
    );
  });

  // Test Tax band 5
  it("Should calculate the correct values for tax band 5 with inputs net=17000, pensionTier=tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=17000&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 20500.15
        expect(response.body).property("basicSalary").to.be.eq(20500.15);
        // Check that gross salary is 20500.15
        expect(response.body).property("gross").to.be.eq(20500.15);
        // Check that paye is 3500.15
        expect(response.body).property("paye").to.be.eq(3500.15);
        // Check that paye is employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that paye is employerContrib is 2665.02
        expect(response.body).property("employerContrib").to.be.eq(2665.02);
      }
    );
  });

  // Test Tax band 6
  it("Should calculate the correct values for tax band 6 with inputs net=30000, pensionTier=tier 1, totalAllowance=0", () => {
    cy.request("GET", "/?net=30000&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 39523
        expect(response.body).property("basicSalary").to.be.eq(39523);
        // Check that gross salary is 39523
        expect(response.body).property("gross").to.be.eq(39523);
        // Check that paye is 9523
        expect(response.body).property("paye").to.be.eq(9523);
        // Check that paye is employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that paye is employerContrib is 5137.99
        expect(response.body).property("employerContrib").to.be.eq(5137.99);
      }
    );
  });
});

describe("Test different pension tiers", () => {
  it("Should calculate correct values for pension tier 1", () => {
    cy.request("GET", "/?net=30000&pensionTier=tier 1&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 39523
        expect(response.body).property("basicSalary").to.be.eq(39523);
        // Check that gross salary is 39523
        expect(response.body).property("gross").to.be.eq(39523);
        // Check that paye is 9523
        expect(response.body).property("paye").to.be.eq(9523);
        // Check that paye is employeeContrib is 0
        expect(response.body).property("employeeContrib").to.be.eq(0);
        // Check that paye is employerContrib is 5137.99
        expect(response.body).property("employerContrib").to.be.eq(5137.99);
      }
    );
  });

  it("Should calculate correct values for pension tier 2", () => {
    cy.request("GET", "/?net=30000&pensionTier=tier 2&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 39523
        expect(response.body).property("basicSalary").to.be.eq(39523);
        // Check that gross salary is 39523
        expect(response.body).property("gross").to.be.eq(39523);
        // Check that paye is 9523
        expect(response.body).property("paye").to.be.eq(9523);
        // Check that paye is employeeContrib is 2173.77
        expect(response.body).property("employeeContrib").to.be.eq(2173.77);
        // Check that paye is employerContrib is 0
        expect(response.body).property("employerContrib").to.be.eq(0);
      }
    );
  });

  it("Should calculate correct values for pension tier 3", () => {
    cy.request("GET", "/?net=30000&pensionTier=tier 3&totalAllowance=0").then(
      (response) => {
        // Check that response is 200 (ok)
        expect(response.status).to.eq(200);
        // Check that basic salary is 39523
        expect(response.body).property("basicSalary").to.be.eq(39523);
        // Check that gross salary is 39523
        expect(response.body).property("gross").to.be.eq(39523);
        // Check that paye is 9523
        expect(response.body).property("paye").to.be.eq(9523);
        // Check that paye is employeeContrib is 1976.15
        expect(response.body).property("employeeContrib").to.be.eq(1976.15);
        // Check that paye is employerContrib is 1976.15
        expect(response.body).property("employerContrib").to.be.eq(1976.15);
      }
    );
  });
});

describe("Test invalid requests", () => {
  it("Should return a 400 when any parameter is missing", () => {
    // Omit net param
    cy.request({
      method: "GET",
      url: "/?pensionTier=tier 1&totalAllowance=0",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
    // Omit totalAllowance param
    cy.request({
      method: "GET",
      url: "/?pensionTier=tier 1&net=1482",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
    // Omit pensionTier
    cy.request({
      method: "GET",
      url: "/?totalAllowance=0&net=1482",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should return a 400 for invalid valid values of any param", () => {
    // Pass non numeric value for net
    cy.request({
      method: "GET",
      url: "/?pensionTier=tier 1&totalAllowance=0&net=NotANumber",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
    // Pass non numeric value for totalAllowance
    cy.request({
      method: "GET",
      url: "/?pensionTier=tier 1&totalAllowance=NotANumber&net=1482",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
    // Pass an invalid pension tier
    cy.request({
      method: "GET",
      url: "/?pensionTier=tier 100&totalAllowance=0&net=1482",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});

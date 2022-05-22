import {FindCursor, WithId, Document} from "mongodb"

type TaxBracket = {val: number, rate: number}
type TaxBrackets = Array<TaxBracket>

type PensionTiers = {[key: string]: any}

type MongoCursor = FindCursor<WithId<Document>> 

type Doc = WithId<Document> | null

export type {TaxBrackets, PensionTiers, MongoCursor, Doc }
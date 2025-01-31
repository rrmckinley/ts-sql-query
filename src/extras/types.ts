import type { MandatoryInsertSets } from "../expressions/insert"
import type { UpdateSets } from "../expressions/update"
import type { ITable, ITableOrView } from "../utils/ITableOrView"
import type { ResultObjectValues } from "../utils/resultUtils"
import type { Column, ComputedColumn } from "../utils/Column"
import { AnyValueSource } from "../expressions/values"

export type SelectedRow<TABLE extends ITableOrView<any>> = ResultObjectValues<{
    [K in ColumnKeys<TABLE>]: TABLE[K];
}>

export type InsertableRow<TABLE extends ITable<any>> = MandatoryInsertSets<TABLE>

export type UpdatableRow<TABLE extends ITable<any>> = UpdateSets<TABLE, TABLE>

export type ColumnKeys<O extends object> = { [K in keyof O]-?: O[K] extends AnyValueSource ? K : never }[keyof O]

export type WritableColumnKeys<O extends object> = { [K in keyof O]-?: O[K] extends Column ? (O[K] extends ComputedColumn ? never : K) : never }[keyof O]

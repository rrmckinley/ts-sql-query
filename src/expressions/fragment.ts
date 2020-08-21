import { AnyDB } from "../databases/AnyDB"
import { ITableOrView } from "../utils/ITableOrView"
import { BooleanValueSource, NumberValueSource, StringValueSource, DateValueSource, TimeValueSource, DateTimeValueSource, EqualableValueSource, IntValueSource, DoubleValueSource, LocalDateValueSource, LocalTimeValueSource, LocalDateTimeValueSource, TypeSafeStringValueSource, StringNumberValueSource, StringIntValueSource, StringDoubleValueSource, ValueSource, ComparableValueSource, MapArgumentToTypeSafe, RemapValueSourceType, TypeOfArgument, MapArgumentToTypeUnsafe } from "../expressions/values"

import { NoTableOrViewRequired } from "../utils/NoTableOrViewRequired"

/*
// Alternative implementation but doen't work in TS 3.5.3 because 'Type instantiation is excessively deep and possibly infinite.' on AbstractConnection

export abstract class AbstractFragmentExpression<DB extends AnyDB, TABLE_OR_VIEW extends ITable<DB>> {
    // @ts-ignore
    protected ___database: DB
    // @ts-ignore
    protected ___table_or_view: TABLE_OR_VIEW
}

export abstract class FragmentExpression<DB extends AnyDB, TABLE_OR_VIEW extends ITable<DB>> extends AbstractFragmentExpression<DB, TABLE_OR_VIEW> {
    abstract withType(type: 'boolean', required: 'required', adapter?: TypeAdapter): BooleanValueSource<DB, TABLE_OR_VIEW, boolean>
    abstract withType(type: 'boolean', required: 'optional', adapter?: TypeAdapter): BooleanValueSource<DB, TABLE_OR_VIEW, boolean | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'stringInt', required: 'required', adapter?: TypeAdapter): StringIntValueSource<DB, TABLE_OR_VIEW, stringInt>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'stringInt', required: 'optional', adapter?: TypeAdapter): StringIntValueSource<DB, TABLE_OR_VIEW, stringInt | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'stringInt', required: 'required', adapter?: TypeAdapter): StringNumberValueSource<DB, TABLE_OR_VIEW, number>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'stringInt', required: 'optional', adapter?: TypeAdapter): StringNumberValueSource<DB, TABLE_OR_VIEW, number | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'int', required: 'required', adapter?: TypeAdapter): IntValueSource<DB, TABLE_OR_VIEW, int>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'int', required: 'optional', adapter?: TypeAdapter): IntValueSource<DB, TABLE_OR_VIEW, int | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'int', required: 'required', adapter?: TypeAdapter): NumberValueSource<DB, TABLE_OR_VIEW, number>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'int', required: 'optional', adapter?: TypeAdapter): NumberValueSource<DB, TABLE_OR_VIEW, number | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'stringDouble', required: 'required', adapter?: TypeAdapter): StringDoubleValueSource<DB, TABLE_OR_VIEW, stringDouble>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'stringDouble', required: 'optional', adapter?: TypeAdapter): StringDoubleValueSource<DB, TABLE_OR_VIEW, stringDouble | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'stringDouble', required: 'required', adapter?: TypeAdapter): StringNumberValueSource<DB, TABLE_OR_VIEW, number>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'stringDouble', required: 'optional', adapter?: TypeAdapter): StringNumberValueSource<DB, TABLE_OR_VIEW, number | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'double', required: 'required', adapter?: TypeAdapter): DoubleValueSource<DB, TABLE_OR_VIEW, double>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'double', required: 'optional', adapter?: TypeAdapter): DoubleValueSource<DB, TABLE_OR_VIEW, double | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'double', required: 'required', adapter?: TypeAdapter): NumberValueSource<DB, TABLE_OR_VIEW, number>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'double', required: 'optional', adapter?: TypeAdapter): NumberValueSource<DB, TABLE_OR_VIEW, number | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'string', required: 'required', adapter?: TypeAdapter): TypeSafeStringValueSource<DB, TABLE_OR_VIEW, string>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'string', required: 'optional', adapter?: TypeAdapter): TypeSafeStringValueSource<DB, TABLE_OR_VIEW, string | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'string', required: 'required', adapter?: TypeAdapter): StringValueSource<DB, TABLE_OR_VIEW, string>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'string', required: 'optional', adapter?: TypeAdapter): StringValueSource<DB, TABLE_OR_VIEW, string | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localDate', required: 'required', adapter?: TypeAdapter): LocalDateValueSource<DB, TABLE_OR_VIEW, LocalDate>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localDate', required: 'optional', adapter?: TypeAdapter): LocalDateValueSource<DB, TABLE_OR_VIEW, LocalDate | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localDate', required: 'required', adapter?: TypeAdapter):  DateValueSource<DB, TABLE_OR_VIEW, Date>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localDate', required: 'optional', adapter?: TypeAdapter):  DateValueSource<DB, TABLE_OR_VIEW, Date | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localTime', required: 'required', adapter?: TypeAdapter): LocalTimeValueSource<DB, TABLE_OR_VIEW, LocalTime>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localTime', required: 'optional', adapter?: TypeAdapter): LocalTimeValueSource<DB, TABLE_OR_VIEW, LocalTime | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localTime', required: 'required', adapter?: TypeAdapter): TimeValueSource<DB, TABLE_OR_VIEW, Date>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localTime', required: 'optional', adapter?: TypeAdapter): TimeValueSource<DB, TABLE_OR_VIEW, Date | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localDateTime', required: 'required', adapter?: TypeAdapter): LocalDateTimeValueSource<DB, TABLE_OR_VIEW, LocalDateTime>
    abstract withType(this: AbstractFragmentExpression<TypeSafeDB, any>, type: 'localDateTime', required: 'optional', adapter?: TypeAdapter): LocalDateTimeValueSource<DB, TABLE_OR_VIEW, LocalDateTime | null | undefined>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localDateTime', required: 'required', adapter?: TypeAdapter): DateTimeValueSource<DB, TABLE_OR_VIEW, Date>
    abstract withType(this: AbstractFragmentExpression<TypeUnsafeDB, any>, type: 'localDateTime', required: 'optional', adapter?: TypeAdapter): DateTimeValueSource<DB, TABLE_OR_VIEW, Date | null | undefined>
    abstract withType<T>(type: 'enum', typeName: string, required: 'required', adapter?: TypeAdapter): EqualableValueSource<DB, TABLE_OR_VIEW, T>
    abstract withType<T>(type: 'enum', typeName: string, required: 'optional', adapter?: TypeAdapter): EqualableValueSource<DB, TABLE_OR_VIEW, T | null | undefined>
    abstract withType<T>(type: 'custom', typeName: string, required: 'required', adapter?: TypeAdapter): EqualableValueSource<DB, TABLE_OR_VIEW, T>
    abstract withType<T>(type: 'custom', typeName: string, required: 'optional', adapter?: TypeAdapter): EqualableValueSource<DB, TABLE_OR_VIEW, T | null | undefined>
    abstract withType<T>(type: 'customComparable', typeName: string, required: 'required', adapter?: TypeAdapter): ComparableValueSource<DB, TABLE_OR_VIEW, T>
    abstract withType<T>(type: 'customComparable', typeName: string, required: 'optional', adapter?: TypeAdapter): ComparableValueSource<DB, TABLE_OR_VIEW, T | null | undefined>
}
*/

export abstract class BooleanFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  BooleanValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): BooleanValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): BooleanValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): BooleanValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): BooleanValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): BooleanValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): BooleanValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): BooleanValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): BooleanValueSource<DB, T, TYPE>
}

export abstract class StringIntFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  StringIntValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): StringIntValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): StringIntValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): StringIntValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): StringIntValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): StringIntValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): StringIntValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): StringIntValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): StringIntValueSource<DB, T, TYPE>
}

export abstract class StringNumberFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  StringNumberValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): StringNumberValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): StringNumberValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): StringNumberValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): StringNumberValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): StringNumberValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): StringNumberValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): StringNumberValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): StringNumberValueSource<DB, T, TYPE>
}

export abstract class IntFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  IntValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): IntValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): IntValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): IntValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): IntValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): IntValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): IntValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): IntValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): IntValueSource<DB, T, TYPE>
}

export abstract class NumberFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  NumberValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): NumberValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): NumberValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): NumberValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): NumberValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): NumberValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): NumberValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): NumberValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): NumberValueSource<DB, T, TYPE>
}

export abstract class StringDoubleFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  StringDoubleValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): StringDoubleValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): StringDoubleValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): StringDoubleValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): StringDoubleValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): StringDoubleValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): StringDoubleValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): StringDoubleValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): StringDoubleValueSource<DB, T, TYPE>
}

export abstract class DoubleFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  DoubleValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): DoubleValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): DoubleValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): DoubleValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): DoubleValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): DoubleValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): DoubleValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): DoubleValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): DoubleValueSource<DB, T, TYPE>
}

export abstract class TypeSafeStringFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  TypeSafeStringValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): TypeSafeStringValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): TypeSafeStringValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): TypeSafeStringValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): TypeSafeStringValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): TypeSafeStringValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): TypeSafeStringValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): TypeSafeStringValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): TypeSafeStringValueSource<DB, T, TYPE>
}

export abstract class StringFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  StringValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): StringValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): StringValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): StringValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): StringValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): StringValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): StringValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): StringValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): StringValueSource<DB, T, TYPE>
}

export abstract class LocalDateFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  LocalDateValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): LocalDateValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): LocalDateValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): LocalDateValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): LocalDateValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): LocalDateValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): LocalDateValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): LocalDateValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): LocalDateValueSource<DB, T, TYPE>
}

export abstract class DateFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  DateValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): DateValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): DateValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): DateValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): DateValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): DateValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): DateValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): DateValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): DateValueSource<DB, T, TYPE>
}

export abstract class LocalTimeFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  LocalTimeValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): LocalTimeValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): LocalTimeValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): LocalTimeValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): LocalTimeValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): LocalTimeValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): LocalTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): LocalTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): LocalTimeValueSource<DB, T, TYPE>
}

export abstract class TimeFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  TimeValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): TimeValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): TimeValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): TimeValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): TimeValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): TimeValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): TimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): TimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): TimeValueSource<DB, T, TYPE>
}

export abstract class LocalDateTimeFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  LocalDateTimeValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): LocalDateTimeValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): LocalDateTimeValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): LocalDateTimeValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): LocalDateTimeValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): LocalDateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): LocalDateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): LocalDateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): LocalDateTimeValueSource<DB, T, TYPE>
}

export abstract class DateTimeFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  DateTimeValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): DateTimeValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): DateTimeValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): DateTimeValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): DateTimeValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): DateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): DateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): DateTimeValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): DateTimeValueSource<DB, T, TYPE>
}

export abstract class EqualableFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  EqualableValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): EqualableValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): EqualableValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): EqualableValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): EqualableValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): EqualableValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): EqualableValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): EqualableValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): EqualableValueSource<DB, T, TYPE>
}

export abstract class ComparableFragmentExpression<DB extends AnyDB, TYPE> {
    abstract sql(sql: TemplateStringsArray):  ComparableValueSource<DB, NoTableOrViewRequired, TYPE>
    abstract sql<T1 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>): ComparableValueSource<DB, T1, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>): ComparableValueSource<DB, T1 | T2, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>): ComparableValueSource<DB, T1 | T2 | T3, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>): ComparableValueSource<DB, T1 | T2 | T3 | T4, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>): ComparableValueSource<DB, T1 | T2 | T3 | T4 | T5, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>): ComparableValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6, TYPE>
    abstract sql<T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>, T6 extends ITableOrView<DB>, T7 extends ITableOrView<DB>>(sql: TemplateStringsArray, p1: ValueSource<DB, T1, any>, p2: ValueSource<DB, T2, any>, p3: ValueSource<DB, T3, any>, p4: ValueSource<DB, T4, any>, p5: ValueSource<DB, T5, any>, p6: ValueSource<DB, T6, any>, p7: ValueSource<DB, T7, any>): ComparableValueSource<DB, T1 | T2 | T3 | T4 | T5 | T6 | T7, TYPE>
    abstract sql<T extends ITableOrView<DB>>(sql: TemplateStringsArray, ...p: ValueSource<DB, T, any>[]): ComparableValueSource<DB, T, TYPE>
}

export interface FragmentBuilder0<DB extends AnyDB> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: () => RESULT): () => RESULT
}

export interface FragmentBuilder1TypeSafe<DB extends AnyDB, A1> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A1>) => RESULT): FargmentFunction1TypeSafe<DB, A1, RESULT>
}

export interface FargmentFunction1TypeSafe<DB extends AnyDB, A1, RESULT> {
    (a1: TypeOfArgument<A1>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>): RemapValueSourceType<DB, T1, RESULT>
}

export interface FragmentBuilder1TypeUnsafe<DB extends AnyDB, A1> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A1>) => RESULT): FargmentFunction1TypeUnsafe<DB, A1, RESULT>
}

export interface FargmentFunction1TypeUnsafe<DB extends AnyDB, A1, RESULT> {
    (a1: TypeOfArgument<A1>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>): RemapValueSourceType<DB, T1, RESULT>
}

export interface FragmentBuilder2TypeSafe<DB extends AnyDB, A1, A2> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A2>) => RESULT): FargmentFunction2TypeSafe<DB, A1, A2, RESULT>
}

export interface FargmentFunction2TypeSafe<DB extends AnyDB, A1, A2, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>): RemapValueSourceType<DB, T1, RESULT>

    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>): RemapValueSourceType<DB, T1 | T2, RESULT>
}

export interface FragmentBuilder2TypeUnsafe<DB extends AnyDB, A1, A2> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A2>) => RESULT): FargmentFunction2TypeUnsafe<DB, A1, A2, RESULT>
}

export interface FargmentFunction2TypeUnsafe<DB extends AnyDB, A1, A2, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>): RemapValueSourceType<DB, T1, RESULT>

    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>): RemapValueSourceType<DB, T1 | T2, RESULT>
}

export interface FragmentBuilder3TypeSafe<DB extends AnyDB, A1, A2, A3> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A3>) => RESULT): FargmentFunction3TypeSafe<DB, A1, A2, A3, RESULT>
}

export interface FargmentFunction3TypeSafe<DB extends AnyDB, A1, A2, A3, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T1 | T2, RESULT>

    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>
}

export interface FragmentBuilder3TypeUnsafe<DB extends AnyDB, A1, A2, A3> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A3>) => RESULT): FargmentFunction3TypeUnsafe<DB, A1, A2, A3, RESULT>
}

export interface FargmentFunction3TypeUnsafe<DB extends AnyDB, A1, A2, A3, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>): RemapValueSourceType<DB, T1 | T2, RESULT>

    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>
}

export interface FragmentBuilder4TypeSafe<DB extends AnyDB, A1, A2, A3, A4> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A3>, a4: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A4>) => RESULT): FargmentFunction4TypeSafe<DB, A1, A2, A3, A4, RESULT>
}

export interface FargmentFunction4TypeSafe<DB extends AnyDB, A1, A2, A3, A4, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T2, RESULT>
    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>

    <T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T4, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T2 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T2 | T4, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T3 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T2 | T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T2 | T3 | T4, RESULT>
}

export interface FragmentBuilder4TypeUnsafe<DB extends AnyDB, A1, A2, A3, A4> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A3>, a4: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A4>) => RESULT): FargmentFunction4TypeUnsafe<DB, A1, A2, A3, A4, RESULT>
}

export interface FargmentFunction4TypeUnsafe<DB extends AnyDB, A1, A2, A3, A4, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T2, RESULT>
    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>

    <T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T4, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T2 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T2 | T4, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T3 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T2 | T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>): RemapValueSourceType<DB, T1 | T2 | T3 | T4, RESULT>
}

export interface FragmentBuilder5TypeSafe<DB extends AnyDB, A1, A2, A3, A4, A5> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A3>, a4: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A4>, a5: MapArgumentToTypeSafe<DB, NoTableOrViewRequired, A5>) => RESULT): FargmentFunction5TypeSafe<DB, A1, A2, A3, A4, A5, RESULT>
}

export interface FargmentFunction5TypeSafe<DB extends AnyDB, A1, A2, A3, A4, A5, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2, RESULT>
    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>
    <T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T4, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T4, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T3 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T4, RESULT>

    <T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T5, RESULT>
    <T1 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T5, RESULT>
    <T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T3 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T3 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T3 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T5, RESULT>
    <T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T4 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T4 | T5, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T3 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T3 | T4 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T3 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeSafe<DB, T1, A1>, a2: MapArgumentToTypeSafe<DB, T2, A2>, a3: MapArgumentToTypeSafe<DB, T3, A3>, a4: MapArgumentToTypeSafe<DB, T4, A4>, a5: MapArgumentToTypeSafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T4 | T5, RESULT>
}

export interface FragmentBuilder5TypeUnsafe<DB extends AnyDB, A1, A2, A3, A4, A5> {
    as<RESULT extends ValueSource<DB, NoTableOrViewRequired, any>>(impl: (a1: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A1>, a2: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A2>, a3: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A3>, a4: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A4>, a5: MapArgumentToTypeUnsafe<DB, NoTableOrViewRequired, A5>) => RESULT): FargmentFunction5TypeUnsafe<DB, A1, A2, A3, A4, A5, RESULT>
}

export interface FargmentFunction5TypeUnsafe<DB extends AnyDB, A1, A2, A3, A4, A5, RESULT> {
    (a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, NoTableOrViewRequired, RESULT>
    <T1 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1, RESULT>
    <T2 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2, RESULT>
    <T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T3, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T3, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T3, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T3, RESULT>
    <T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T4, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T4, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T3 | T4, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T2 | T3 | T4, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: TypeOfArgument<A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T4, RESULT>

    <T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T5, RESULT>
    <T1 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T5, RESULT>
    <T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T3 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T3 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T3 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: TypeOfArgument<A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T5, RESULT>
    <T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T4 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: TypeOfArgument<A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T4 | T5, RESULT>
    <T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T3 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: TypeOfArgument<A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T3 | T4 | T5, RESULT>
    <T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: TypeOfArgument<A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T2 | T3 | T4 | T5, RESULT>
    <T1 extends ITableOrView<DB>, T2 extends ITableOrView<DB>, T3 extends ITableOrView<DB>, T4 extends ITableOrView<DB>, T5 extends ITableOrView<DB>>(a1: MapArgumentToTypeUnsafe<DB, T1, A1>, a2: MapArgumentToTypeUnsafe<DB, T2, A2>, a3: MapArgumentToTypeUnsafe<DB, T3, A3>, a4: MapArgumentToTypeUnsafe<DB, T4, A4>, a5: MapArgumentToTypeUnsafe<DB, T5, A5>): RemapValueSourceType<DB, T1 | T2 | T3 | T4 | T5, RESULT>
}


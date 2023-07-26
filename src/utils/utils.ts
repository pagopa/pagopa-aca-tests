import { AmountEuroCents } from "../generated/aca/AmountEuroCents";
import { EntityTypeEnum, NewDebtPositionRequest } from "../generated/aca/NewDebtPositionRequest";

export const createRequestBodyForAca = (
    debitPositionAmount: Number
): NewDebtPositionRequest => ({
    amount: debitPositionAmount as AmountEuroCents,
    description: "Description test",
    entityFiscalCode: "RYGFHD54YR73DF73",
    entityFullName: "Mario Rossi",
    entityType: EntityTypeEnum.F,
    expirationDate: new Date("2030-01-01T09:00:00.000Z"),
    iuv: Math.floor(Math.random() * 1000000000000000).toString(),
    paFiscalCode: "66666666666"
});
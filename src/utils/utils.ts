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
    iuv: "002720356084529460",
    paFiscalCode: "66666666666"
});
export interface IMachineUnit {
   name: String,
   status: MachineUnitStatus,
   health_level: Number
};

export enum MachineUnitStatus {
   OPERACAO,
   ALERTA,
   PARADA
};

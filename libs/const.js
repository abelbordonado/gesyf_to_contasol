const GESYF = {
  //Asiento Fecha	CuentaD	ImporteD	CuentaH	ImporteH	Concepto	Punteo	ImporteDE	ImporteHE	FactorC	Tipo
  SEAT: 0, // Asiento
  DATE: 1, // Fecha
  DUTY: 2, // Deber (CuentaD)
  AMOUNT_DUTY: 3, // ImportD
  CREDIT: 4, // Haber (CuentaH)
  AMOUNT_CREDIT: 5, //  ImporteH
  TOPIC: 6, // Concepto
  TOTAL_ROWS: 6,
};

const CONTAPLUS = {
  // Diario	Fecha	Asiento	Orden	Cuenta	Importe pesetas	Concepto	Documento	Importe DEBE en euros	Importe HABER en euros	Moneda	Punteo	Tipo de IVA	Código de IVA	Departamento	Subdepartamento	Archivo de imagen
  DIARY: 0, // Diario
  DATE: 1, // Fecha
  SEAT: 2, // Orden
  ORDER: 3,
  ACCOUNT: 4, // Cuenta (Haber o Deber)
  TOPIC: 6,
  AMOUNT_DUTY: 8, // Importe Debe
  AMOUNT_CREDIT: 9, //  Importe Haber

  HEADERS: [
    "Diario",
    "Fecha",
    "Asiento",
    "Orden",
    "Cuenta",
    "Importe pesetas",
    "Concepto",
    "Documento",
    "Importe DEBE en euros",
    "Importe HABER en euros",
    "Moneda",
    "Punteo",
    "Tipo de IVA",
    "Código de IVA",
    "Departamento",
    "Subdepartamento",
    "Archivo de imagen",
  ],
  TOTAL_COLUMNS: 17,
};

module.exports = {
  GESYF,
  CONTAPLUS,
};

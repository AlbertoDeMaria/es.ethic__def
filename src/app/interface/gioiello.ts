export interface Gioiello {
  id: string;
  nome: string;
  codice: string;
  edizione: string | null;
  materiale: string;
  lavorazione: string | null;
  size: string | null;
  price_no_iva: string;
  price_iva: string;
  tipologia: string;
}

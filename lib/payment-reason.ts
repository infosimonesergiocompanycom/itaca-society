/** Causale precompilata del bonifico: permette alla segreteria di abbinare il versamento al socio. */
export function paymentReason(m: { card_number: string | null; last_name: string; first_name: string }, year = new Date().getFullYear()) {
  return `Quota associativa Itaca Society ${year} - ${m.card_number ?? ""} - ${m.last_name} ${m.first_name}`.replace(/\s+-\s+-/, " -");
}

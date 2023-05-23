namespace BusinessCore.Domain
{
    public class Payment
    {
        public int CardNo { get; set; }
        public string CardHolder { get; set; }
        public int AmountTrxn { get; set; }
        public int CurrencyCode { get; set; }
        public int ProcessingCode { get; set; }
        public int SystemTraceNr { get; set; }
        public int FunctionCode { get; set; }
    }
}

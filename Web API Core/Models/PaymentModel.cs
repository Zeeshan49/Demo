using System.Text.Json.Serialization;

namespace Web_API_Core.Models
{
    public class PaymentModel
    {
        [JsonPropertyName("cardNo")]
        public long CardNo { get; set; }

        [JsonPropertyName("cardHolder")]
        public string CardHolder { get; set; }

        [JsonPropertyName("amountTrxn")]
        public int AmountTrxn { get; set; }

        [JsonPropertyName("currencyCode")]
        public int CurrencyCode { get; set; }

        [JsonPropertyName("processingCode")]
        public int ProcessingCode { get; set; }

        [JsonPropertyName("systemTraceNr")]
        public int SystemTraceNr { get; set; }

        [JsonPropertyName("functionCode")]
        public int FunctionCode { get; set; }

    }
    public enum CurrencyType
    {
        USD = 840,
    }
}

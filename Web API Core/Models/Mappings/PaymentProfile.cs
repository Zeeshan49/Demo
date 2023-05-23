using AutoMapper;
using BusinessCore.Domain;

namespace Web_API_Core.Models.Mappings
{
    public class PaymentProfile : Profile
    {
        public PaymentProfile()
        {
            CreateMap<Payment, PaymentModel>().ReverseMap();
        }
    }
}

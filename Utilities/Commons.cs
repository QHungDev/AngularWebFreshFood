using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
namespace Utilities
{
    public static class Commons
    {
        public static string GetFirstImage(this string value)
        {
            string result = value.Split('\n')[0];
            return result;
        }

        public static string[] GetListImage(this string value)
        {
            string[] result = value.Split('\n');
            return result;
        }

        public static string RemoveSign(this string value)
        {
            string result = value;

            string[] charList = new string[] { "aáàảãạăắằẳẵặâấầẩẫậ", "oóòỏõọôốồổỗộơớờởỡợ", "eéèẻẽẹêếềểễệ", "iíìỉĩị", "uúùủũụưứừửữự", "yýỳỷỹỵ", "dđ" };

            //Chạy N lần, mỗi lần qua 1 đoạn trong charList
            for (int i = 0; i < charList.Length; i++)
            {
                //Chạy qua từng ký tự của 1 đoạn trong vòng for bên ngoài
                for (int j = 1; j < charList[i].Length; j++)
                {
                    result = result.Replace(charList[i][j], charList[i][0]);
                    result = result.Replace(charList[i][j].ToString().ToUpper(), charList[i][0].ToString().ToUpper());
                }
            }

            return result;
        }

        public static string ToUrlFormat(this string value)
        {
            value = value.ToLower();
            value = value.RemoveSign();

            string charList = " ~!@#$%^&*()_+/\\:'|{},.?<>[]";
            for (int i = 0; i < charList.Length; i++)
            {
                value = value.Replace(charList[i], '-');
            }

            //Thay thế những dấu - kép thành dấu - đơn
            Regex regex = new Regex("-+");
            value = regex.Replace(value, "-");

            return value;
        }

        public static string GetBonusPecent(this double? price, double? oldPrice)
        {
            if (oldPrice == null || price == null)
                return "0%";

            double bonusPecent = 100 - (100 * price.Value / oldPrice.Value);
            bonusPecent = Math.Round(bonusPecent, 0);
            return bonusPecent + "%";
        }

        public static string GetCurrencyFormat(this double? value)
        {
            if (value == null)
                return string.Empty;

            return value.Value.ToString("0,0 vnđ");
        }
    }
}

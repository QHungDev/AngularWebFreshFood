using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Responses
{
    public class PagingResponse<T>
    {
        public IList<T> Data { get; set; }
        public int Total { get; set; }
    }
}

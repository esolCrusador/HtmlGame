using System.Web.Mvc;

namespace HtmlShooter.Controllers
{
    public class HomeController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
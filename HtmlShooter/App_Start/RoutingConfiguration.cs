using System.Web.Mvc;
using System.Web.Routing;

namespace HtmlShooter.App_Start
{
    public static class RoutingConfiguration
    {
        public static void Register(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional });
        }
    }
}
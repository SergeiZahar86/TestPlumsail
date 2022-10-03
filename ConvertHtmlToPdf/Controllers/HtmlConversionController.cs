using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;

namespace ConvertHtmlToPdf.Controllers;

/// <summary>
/// Контроллер для управления преобразованием html файлав
/// </summary>
[ApiController]
[Route("[controller]/[action]")]
public class HtmlConversionController : ControllerBase
{
    public HtmlConversionController()
    {
    }
    
    [HttpPost]
    [Obsolete("Obsolete")]
    public async Task<FileResult> UploadFiles()
    {
        var fff = HttpContext;
        var response = HttpContext.Response;
        var request = HttpContext.Request;

        response.ContentType = "application/pdf";

        IFormFileCollection files = request.Form.Files;
        // путь к папке, где будут храниться файлы
        var uploadPath = $"{Directory.GetCurrentDirectory()}/uploads";
        // создаем папку для хранения файлов
        Directory.CreateDirectory(uploadPath);
        string fullPath = "";

        foreach (var file in files)
        {
            // путь к папке uploads
            fullPath = $"{uploadPath}/{file.FileName}";

            // сохраняем файл в папку uploads
            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }

        await response.WriteAsync("Файлы успешно загружены");

        await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultRevision);
        var browser = await Puppeteer.LaunchAsync(new LaunchOptions
        {
            Headless = true
        });
        var page = await browser.NewPageAsync();
        await page.GoToAsync(@"C:/Users/sergei/Desktop/PuppeteerSharp.html");
        await page.PdfAsync(@"C:/Users/sergei/Desktop/PuppeteerSharp.pdf");

        // Путь к файлу
        //string file_path = Path.Combine(_appEnvironment.ContentRootPath, "Files/book.pdf");
        // Тип файла - content-type
        //string file_type = "application/pdf";
        // Имя файла - необязательно
        //string file_name = "book.pdf";
        // return PhysicalFile(file_path, file_type, file_name);
        //return PhysicalFile(@"C:/Users/sergei/Desktop/PuppeteerSharp.pdf", file_type, "PuppeteerSharp.pdf");
        
        
        byte[] mas = System.IO.File.ReadAllBytes(@"C:/Users/sergei/Desktop/PuppeteerSharp.pdf");
        string file_type = "application/pdf";
        string file_name = "PuppeteerSharp.pdf";
        return File(mas, file_type, file_name);
    }

    [HttpGet]
    public IActionResult GetFile()
    {
        byte[] mas = System.IO.File.ReadAllBytes(@"C:/Users/sergei/Desktop/PuppeteerSharp.pdf");
        string file_type = "application/pdf";
        string file_name = "PuppeteerSharp.pdf";
        return File(mas, file_type, file_name);
        
        
        /*
        var response = HttpContext.Response;

        HttpContext.Response.ContentType = "application/pdf";
        HttpContext.Response.Headers.Add("Content-Disposition", "inline; filename=PuppeteerSharp.pdf");
        var stream = new FileStream(@"C:/Users/sergei/Desktop/PuppeteerSharp.pdf", FileMode.Open);
        return new FileStreamResult(stream, "application/pdf"); 
    */
    }
}
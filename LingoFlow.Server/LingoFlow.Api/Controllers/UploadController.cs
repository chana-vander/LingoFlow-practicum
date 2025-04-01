using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;

namespace MagicalMusic.Api.Controllers
{
    [Route("api/UploadFile")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public UploadController(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:lingoFlow-app"];// לבקט שלי
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            Console.WriteLine($"Creating presigned URL for file: {fileName}");

            if (string.IsNullOrEmpty(fileName))
                return BadRequest("שם הקובץ נדרש");

            // הוספת לוג לבדוק את שם ה-Bucket
            Console.WriteLine($"Bucket Name: {_bucketName}");

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = $"Audio/{fileName}", // קבצים נשמרים בתיקיית Audio
                Verb = HttpVerb.GET, // שינוי ל-GET כדי לקבל את השיר
                Expires = DateTime.UtcNow.AddMinutes(10),
                ContentType = "mp3" // סוג הקובץ של אודיו
            };

            // הוספת כותרת ACL
            request.Headers["x-amz-acl"] = "bucket-owner-full-control";

            try
            {
                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"AWS Error: {ex.Message}");
                return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
            }


        }

    }
}
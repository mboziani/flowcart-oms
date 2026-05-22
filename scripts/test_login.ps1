$uri = "http://localhost:5220/api/identity/login"
$body = @{
    email = "admin@flowcart.local"
    password = "Password123!"
} | ConvertTo-Json

Write-Host "Testing Login API at $uri"
Write-Host "Payload: $body"
Write-Host "--------------------------------------------------"

try {
    $response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -ContentType "application/json"
    Write-Host "Login Successful! Received Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 4
}
catch {
    Write-Host "Login Failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails) {
        Write-Host "Details: " $_.ErrorDetails.Message
    }
}

$testTarget = Read-Host "Enter FQDN with port of test server (example.com:5000)"

$avg = $null; $avg = @()
while ($true) {
    $stopwatch =  [system.diagnostics.stopwatch]::StartNew()
    invoke-restmethod "http://$testTarget/circle?percentage=20&color=%23DC143C&strokeWidth=10" | Out-Null
    $stopwatch.Stop()

    $avg += [math]::round($stopwatch.Elapsed.TotalMilliseconds)
    $a = [math]::round(($avg  | select -First 7 | Measure-Object -Average).Average)

    if ($avg.count -eq 1) { Write-Host "Average response time: " -f cyan }
    Write-Host "> ${a}ms   `r" -f yellow -nonew
}

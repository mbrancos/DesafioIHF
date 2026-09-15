<#
.SYNOPSIS
  Bisection script to find which test creates unwanted files/state (Windows PowerShell).
.DESCRIPTION
  Runs tests one-by-one and checks if a specific polluting file or directory appeared.
.PARAMETER PollutionCheck
  Path of the file or directory that is created unexpectedly.
.PARAMETER TestPattern
  Glob pattern or file search filter for test files.
.EXAMPLE
  .\find-polluter.ps1 -PollutionCheck '.git' -TestPattern '*.test.ts'
#>
[CmdletBinding()]
param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$PollutionCheck,

    [Parameter(Mandatory = $true, Position = 1)]
    [string]$TestPattern
)

Write-Host "Searching for test that creates: $PollutionCheck" -ForegroundColor Cyan
Write-Host "Test pattern: $TestPattern" -ForegroundColor DarkGray
Write-Host ""

# Resolve test files
$testFiles = Get-ChildItem -Path . -Recurse -File -Filter $TestPattern -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName

if (-not $testFiles -or $testFiles.Count -eq 0) {
    # Try finding with wildcard in path
    $testFiles = Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -like "*$TestPattern*" } | Select-Object -ExpandProperty FullName
}

$total = if ($testFiles) { @($testFiles).Count } else { 0 }
Write-Host "Found $total test file(s)" -ForegroundColor Gray
Write-Host ""

if ($total -eq 0) {
    Write-Warning "No test files matched pattern: $TestPattern"
    exit 0
}

$count = 0
foreach ($testFile in $testFiles) {
    $count++
    $relPath = Resolve-Path -Relative $testFile

    # Skip if pollution already exists
    if (Test-Path $PollutionCheck) {
        Write-Host "⚠️  Pollution already exists before test $count/$total" -ForegroundColor Yellow
        Write-Host "   Skipping: $relPath" -ForegroundColor DarkGray
        continue
    }

    Write-Host "[$count/$total] Testing: $relPath" -ForegroundColor White

    # Run test
    & npm test $relPath 2>$null | Out-Null

    # Check if pollution appeared
    if (Test-Path $PollutionCheck) {
        Write-Host ""
        Write-Host "🎯 FOUND POLLUTER!" -ForegroundColor Red
        Write-Host "   Test: $relPath" -ForegroundColor Yellow
        Write-Host "   Created: $PollutionCheck" -ForegroundColor Red
        Write-Host ""
        Write-Host "Pollution details:" -ForegroundColor Gray
        Get-Item $PollutionCheck | Format-List
        Write-Host ""
        Write-Host "To investigate:" -ForegroundColor Cyan
        Write-Host "  npm test $relPath" -ForegroundColor White
        Write-Host "  Get-Content $relPath" -ForegroundColor White
        exit 1
    }
}

Write-Host ""
Write-Host "✅ No polluter found - all tests clean!" -ForegroundColor Green
exit 0

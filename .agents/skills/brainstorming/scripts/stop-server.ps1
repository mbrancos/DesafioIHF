<#
.SYNOPSIS
  Stops the brainstorm visual companion server on Windows (PowerShell).
#>
[CmdletBinding()]
param (
    [string]$ProjectDir = $PSScriptRoot + "\..\..\..\.."
)

$resolvedProjectDir = Resolve-Path $ProjectDir -ErrorAction SilentlyContinue
if (-not $resolvedProjectDir) {
    $resolvedProjectDir = $PWD.Path
}

$sessionDir = Join-Path $resolvedProjectDir ".superpowers\brainstorm\session"
$pidFile = Join-Path $sessionDir "state\server.pid"

if (Test-Path $pidFile) {
    $pidToKill = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($pidToKill) {
        Write-Host "Stopping brainstorm server with PID: $pidToKill..." -ForegroundColor Yellow
        Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
        Write-Host "Brainstorm server stopped." -ForegroundColor Green
        exit 0
    }
}

Write-Host "No running brainstorm server PID file found." -ForegroundColor Gray
exit 0

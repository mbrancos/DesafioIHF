<#
.SYNOPSIS
  Starts the brainstorm visual companion server on Windows (PowerShell).
.PARAMETER ProjectDir
  Root directory where .superpowers/brainstorm session files are saved.
.PARAMETER HostName
  Host to bind (default: 127.0.0.1). Can also be passed as -Host.
.PARAMETER Port
  Port to listen on (default: auto/random high port).
.PARAMETER Open
  Automatically open default browser once started.
#>
[CmdletBinding()]
param (
    [string]$ProjectDir = $PSScriptRoot + "\..\..\..\..",
    [Alias("Host")]
    [string]$HostName = "127.0.0.1",
    [string]$Port = "",
    [switch]$Open
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$resolvedProjectDir = Resolve-Path $ProjectDir -ErrorAction SilentlyContinue
if (-not $resolvedProjectDir) {
    $resolvedProjectDir = $PWD.Path
}

$sessionDir = Join-Path $resolvedProjectDir ".superpowers\brainstorm\session"
$stateDir = Join-Path $sessionDir "state"
$contentDir = Join-Path $sessionDir "content"
$pidFile = Join-Path $stateDir "server.pid"
$logFile = Join-Path $stateDir "server.log"

New-Item -ItemType Directory -Force -Path $stateDir | Out-Null
New-Item -ItemType Directory -Force -Path $contentDir | Out-Null

# Stop previous process if running
if (Test-Path $pidFile) {
    $oldPid = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($oldPid) {
        Stop-Process -Id $oldPid -Force -ErrorAction SilentlyContinue
    }
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
}

$env:BRAINSTORM_DIR = $sessionDir
$env:BRAINSTORM_HOST = $HostName
if ($Port) { $env:BRAINSTORM_PORT = $Port }
if ($Open) { $env:BRAINSTORM_OPEN = "1" }
$env:BRAINSTORM_OWNER_PID = ""

$serverJs = Join-Path $scriptDir "server.cjs"
$process = Start-Process -FilePath "node" -ArgumentList "`"$serverJs`"" -PassThru -NoNewWindow -RedirectStandardOutput $logFile -RedirectStandardError $logFile

$process.Id | Out-File -FilePath $pidFile -Encoding ascii -Force

# Wait briefly for startup info
Start-Sleep -Milliseconds 800

if (Test-Path $logFile) {
    Get-Content $logFile -Tail 10 | Write-Host -ForegroundColor Cyan
}

Write-Host "Brainstorm server started with PID: $($process.Id)" -ForegroundColor Green

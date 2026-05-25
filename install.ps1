param(
  [Parameter(Mandatory=$true)]
  [string]$ProjectPath
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Starter = Join-Path $Root "starter"

if (-not (Test-Path $Starter)) {
  throw "starter folder not found"
}

New-Item -ItemType Directory -Force -Path $ProjectPath | Out-Null
Get-ChildItem -Path $Starter -Force | Copy-Item -Destination $ProjectPath -Recurse -Force
Copy-Item -Path (Join-Path $Root "CLAUDE.md") -Destination (Join-Path $ProjectPath "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $Root "ONE_PROMPT.md") -Destination (Join-Path $ProjectPath "ONE_PROMPT.md") -Force

$envExample = Join-Path $ProjectPath ".env.example"
if (-not (Test-Path $envExample)) {
  @"
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=
AUTH_SECRET=
OBSIDIAN_REST_API_KEY=
GRAPHITI_URL=
SERENA_PROJECT=
"@ | Set-Content -Path $envExample -Encoding utf8
}

Write-Host "Installed Agentic SaaS OS starter at $ProjectPath"
Write-Host "Next:"
Write-Host "  cd $ProjectPath"
Write-Host "  pnpm install"
Write-Host "  pnpm dev"
Write-Host "  claude"
Write-Host "Paste ONE_PROMPT.md into Claude."

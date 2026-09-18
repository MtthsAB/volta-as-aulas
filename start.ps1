# Sobe o app em um comando: .\start.ps1
# Instala as dependências se a pasta node_modules não existir ou estiver incompleta

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules\expo-router")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    if (-not $?) {
        Write-Host "Falha ao instalar. Verifique a conexao e tente de novo." -ForegroundColor Red
        exit 1
    }
}

npx expo start

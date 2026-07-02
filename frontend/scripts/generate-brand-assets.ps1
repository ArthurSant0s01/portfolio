Add-Type -AssemblyName System.Drawing

function New-BrandImage {
  param(
    [string]$Path,
    [int]$Width,
    [int]$Height,
    [string]$Title,
    [string]$Subtitle,
    [int]$TitleSize,
    [int]$SubtitleSize,
    [switch]$SquareIcon
  )

  $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
  $graphics = [System.Drawing.Graphics]::FromImage($bmp)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $rect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    ([System.Drawing.Color]::FromArgb(10, 10, 10)),
    ([System.Drawing.Color]::FromArgb(18, 18, 18)),
    45
  )
  $graphics.FillRectangle($bg, $rect)

  $cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(6, 182, 212))
  $blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(59, 130, 246))
  $purpleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(139, 92, 246))
  $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 220, 220, 230))

  $graphics.FillEllipse($blueBrush, -40, -20, [Math]::Max(160, [int]($Width * 0.38)), [Math]::Max(160, [int]($Height * 0.58)))
  $graphics.FillEllipse($purpleBrush, [int]($Width * 0.58), [int]($Height * 0.36), [Math]::Max(140, [int]($Width * 0.34)), [Math]::Max(140, [int]($Height * 0.44)))
  $graphics.FillEllipse($cyanBrush, [int]($Width * 0.34), [int]($Height * 0.10), [Math]::Max(80, [int]($Width * 0.18)), [Math]::Max(80, [int]($Height * 0.24)))

  if ($SquareIcon) {
    $font = New-Object System.Drawing.Font("Segoe UI", [float]$TitleSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $graphics.DrawString("A", $font, $whiteBrush, (New-Object System.Drawing.RectangleF(0, 0, $Width, $Height)), $format)
    $font.Dispose()
    $format.Dispose()
  } else {
    $titleFont = New-Object System.Drawing.Font("Segoe UI", [float]$TitleSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $subtitleFont = New-Object System.Drawing.Font("Segoe UI", [float]$SubtitleSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.DrawString($Title, $titleFont, $whiteBrush, [float]($Width * 0.1), [float]($Height * 0.34))
    $graphics.DrawString($Subtitle, $subtitleFont, $mutedBrush, [float]($Width * 0.1), [float]($Height * 0.56))
    $titleFont.Dispose()
    $subtitleFont.Dispose()
  }

  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $mutedBrush.Dispose()
  $whiteBrush.Dispose()
  $purpleBrush.Dispose()
  $blueBrush.Dispose()
  $cyanBrush.Dispose()
  $bg.Dispose()
  $graphics.Dispose()
  $bmp.Dispose()
}

New-BrandImage -Path "public/og-image.png" -Width 1200 -Height 630 -Title "Arthur Santos" -Subtitle "Creative Developer | Web Development | AI | Photography | Videography" -TitleSize 76 -SubtitleSize 28
New-BrandImage -Path "public/apple-touch-icon.png" -Width 180 -Height 180 -Title "" -Subtitle "" -TitleSize 96 -SubtitleSize 10 -SquareIcon
New-BrandImage -Path "public/favicon-32x32.png" -Width 32 -Height 32 -Title "" -Subtitle "" -TitleSize 20 -SubtitleSize 8 -SquareIcon
New-BrandImage -Path "public/favicon-16x16.png" -Width 16 -Height 16 -Title "" -Subtitle "" -TitleSize 10 -SubtitleSize 6 -SquareIcon
New-BrandImage -Path "public/icon-192.png" -Width 192 -Height 192 -Title "" -Subtitle "" -TitleSize 110 -SubtitleSize 10 -SquareIcon
New-BrandImage -Path "public/icon-512.png" -Width 512 -Height 512 -Title "" -Subtitle "" -TitleSize 280 -SubtitleSize 10 -SquareIcon

Write-Output "Generated brand PNG assets."
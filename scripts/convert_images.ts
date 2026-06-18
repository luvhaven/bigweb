
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const publicDir = path.join(process.cwd(), 'public');
const socialsDir = path.join(publicDir, 'images', 'socials');

if (!fs.existsSync(socialsDir)) {
    fs.mkdirSync(socialsDir, { recursive: true });
}

// 1. Convert logo_pulse.svg (Existing logo) -> logo_pulse.png
const logoSource = path.join(publicDir, 'logo_pulse.svg');
const logoDest = path.join(socialsDir, 'logo_pulse.png');

if (fs.existsSync(logoSource)) {
    sharp(logoSource)
        .resize(1024, 1024) // High res
        .png()
        .toFile(logoDest)
        .then(() => console.log('Successfully created logo_pulse.png'))
        .catch(err => console.error('Error creating logo_pulse.png:', err));
} else {
    console.error('Source logo_pulse.svg not found at:', logoSource);
}

// 2. Convert banner.svg (New banner) -> banner.png
const bannerSource = path.join(socialsDir, 'banner.svg');
const bannerDest = path.join(socialsDir, 'banner.png');

if (fs.existsSync(bannerSource)) {
    sharp(bannerSource)
        .resize(1500, 500)
        .png()
        .toFile(bannerDest)
        .then(() => console.log('Successfully created banner.png'))
        .catch(err => console.error('Error creating banner.png:', err));
} else {
    console.error('Source banner.svg not found at:', bannerSource);
}

// 3. Convert banner_revenue_systems.svg -> banner_revenue_systems.png
const revBannerSource = path.join(socialsDir, 'banner_revenue_systems.svg');
const revBannerDest = path.join(socialsDir, 'banner_revenue_systems.png');

if (fs.existsSync(revBannerSource)) {
    sharp(revBannerSource)
        .resize(1500, 500)
        .png()
        .toFile(revBannerDest)
        .then(() => console.log('Successfully created banner_revenue_systems.png'))
        .catch(err => console.error('Error creating banner_revenue_systems.png:', err));
} else {
    console.error('Source banner_revenue_systems.svg not found at:', revBannerSource);
}

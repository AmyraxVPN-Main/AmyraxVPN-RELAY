<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=26&pause=1000&color=00C7B7&center=true&vCenter=true&width=600&lines=AMYRAX+RELAY+v3;Netlify+Edge+Function+Relay;XHTTP+%7C+VLESS+%7C+WebSocket" alt="AmyraxVPN Relay" />

<br>

### ☁️ R E L A Y · E D G E · F U N C T I O N · v 3

<br>

[![Telegram](https://img.shields.io/badge/کانال_اصلی-AmyraxVPN-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/AmyraxVPN)
[![Telegram](https://img.shields.io/badge/کانال_کانفیگ-AmyraxConfig-229ED9?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/AmyraxConfig)

<br>

![Netlify](https://img.shields.io/badge/Netlify-Edge_Function-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![Runtime](https://img.shields.io/badge/Runtime-Deno-000000?style=flat-square&logo=deno&logoColor=white)
![Protocol](https://img.shields.io/badge/Protocol-XHTTP_·_VLESS_·_WS-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-v3-orange?style=flat-square)

</div>

---

## 🔍 این پروژه چیه؟

یه **Netlify Edge Function** که به عنوان یه relay/proxy عمل می‌کنه.
ترافیک کلاینت رو دریافت می‌کنه و بر اساس هدر `x-host`، اون رو به سرور اصلی (upstream) فوروارد می‌کنه.

مناسب برای:
- کانفیگ‌های **VLESS + XHTTP**
- دور زدن فیلترینگ از طریق CDN نتلیفای
- مخفی کردن آدرس سرور واقعی پشت Edge

---

## 🗂️ ساختار پروژه

```
AmyraxVPN-RELAY-v3/
├── netlify/
│   └── edge-functions/
│       └── relay.js          ← هسته اصلی — Edge Function
├── public/
│   └── index.html            ← صفحه پیش‌فرض (بدون x-host)
├── netlify.toml              ← تنظیمات روت و Edge Function
└── package.json              ← اسکریپت build و dev
```

---

## ⚙️ نحوه کار

> [!NOTE]
> هر درخواستی که به دامنه Netlify میاد، قبل از رسیدن به سرور از داخل `relay.js` رد میشه.

```
Client ──► Netlify Edge (relay.js) ──► Upstream Server
                   │
                   └── x-host header → آدرس سرور واقعی
```

<div align="center">

| شرط | رفتار |
|:---|:---|
| درخواست به `/` بدون هدر `x-host` | صفحه fallback سرو میشه |
| درخواست با هدر `x-host` | relay به upstream |
| هدر `x-host` نداشته باشه | خطای `400` برمیگرده |
| upstream در دسترس نباشه | خطای `502 Bad Gateway` |

</div>

---

## 🔧 ویژگی‌های فنی

| ویژگی | توضیح |
|:---|:---|
| 🧹 **Header Filtering** | هدرهای hop-by-hop و هدرهای داخلی Netlify حذف میشن |
| 📦 **Body Buffering** | بدنه درخواست قبل از ارسال به ArrayBuffer تبدیل میشه (رفع باگ xPaddingBytes) |
| 🔄 **Redirect Manual** | ریدایرکت‌ها دست‌نخورده به کلاینت برمیگردن |
| 🌐 **Auto HTTPS** | اگه پورت مشخص نباشه، اتوماتیک HTTPS استفاده میشه |
| 📡 **IP Forwarding** | IP واقعی کلاینت از طریق `x-forwarded-for` به upstream میرسه |
| ⚡ **XHTTP Support** | باگ HTTP 000 / chunked body در Deno برطرف شده (v1.0.2 fix) |

---

## 🚀 دیپلوی روی Netlify

### روش اول — یه‌کلیکی

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### روش دوم — دستی

**۱. پیش‌نیازها:**

```bash
npm install -g netlify-cli
```

**۲. کلون یا آپلود پروژه:**

```bash
cd AmyraxVPN-RELAY-v3
npm install
```

**۳. لاگین و دیپلوی:**

```bash
netlify login
netlify deploy --prod
```

---

## 🛠️ تست لوکال

```bash
netlify dev
```

بعد توی مرورگر یا curl:

```bash
curl -H "x-host: your-upstream-server.com" http://localhost:8888/
```

---

## 📡 نحوه استفاده در کانفیگ VLESS

توی کانفیگ V2Ray / Xray، آدرس سرور رو دامنه Netlify بذار و هدر `x-host` رو برابر آدرس سرور واقعیت تنظیم کن:

```json
{
  "address": "your-site.netlify.app",
  "port": 443,
  "streamSettings": {
    "network": "xhttp",
    "xhttpSettings": {
      "host": "your-site.netlify.app",
      "headers": {
        "x-host": "your-real-server.com:port"
      }
    }
  }
}
```

> [!IMPORTANT]
> مقدار `x-host` باید آدرس و پورت سرور واقعی‌ات باشه — نه دامنه Netlify.

---

## 📋 متغیرهای مهم در کد

| متغیر | مقدار پیش‌فرض | توضیح |
|:---|:---|:---|
| `FALLBACK_URL` | `amyrax125.github.io/NETLIFY/` | صفحه‌ای که بدون `x-host` نمایش داده میشه |
| `HOP_BY_HOP` | لیست هدرها | هدرهایی که فیلتر و حذف میشن |
| `NF_PREFIXES` | `x-nf-` · `x-netlify-` | هدرهای داخلی Netlify که حذف میشن |

---

## 📝 تغییرات نسخه‌ها

| نسخه | تغییر |
|:---|:---|
| **v3** | بهینه‌سازی کلی، ساختار تمیزتر |
| **v1.0.2** | رفع باگ xPaddingBytes / HTTP 000 در Deno با body buffering |
| **v1.0.0** | انتشار اولیه |

---

## ❓ سوالات متداول

<details>
<summary><b>چرا Netlify؟</b></summary>
<br>
Netlify Edge Functions روی شبکه Anycast اجرا میشن — یعنی از نقاط مختلف دنیا دسترسی سریع دارن و IP‌شون معمولاً فیلتر نیست.
</details>

<details>
<summary><b>آیا WebSocket پشتیبانی میشه؟</b></summary>
<br>
بله — Edge Function هدر Upgrade رو تشخیص میده و اجازه عبور میده. اما Netlify Edge Functions محدودیت‌هایی روی WebSocket دارن؛ برای اتصال پایدار XHTTP توصیه میشه.
</details>

<details>
<summary><b>آیا لاگ IP کاربران ثبت میشه؟</b></summary>
<br>
IP از هدر x-real-ip یا x-forwarded-for خونده میشه و فقط به upstream فوروارد میشه — هیچ لاگی توی کد ذخیره نمیشه. لاگ‌های Netlify طبق سیاست خودشون نگهداری میشه.
</details>

---

<div align="center">

**ساخته شده با ❤️ توسط Amyrax**

<br>

[![Telegram](https://img.shields.io/badge/AmyraxVPN-Telegram-2CA5E0?style=for-the-badge&logo=telegram)](https://t.me/AmyraxVPN)
[![Telegram](https://img.shields.io/badge/AmyraxConfig-Telegram-229ED9?style=for-the-badge&logo=telegram)](https://t.me/AmyraxConfig)

<br>

*این پروژه تحت لایسنس MIT منتشر شده*

</div>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&pause=1000&color=00C7B7&center=true&vCenter=true&width=600&lines=AMYRAX+RELAY;Netlify+Edge+Function;Deploy+%26+Go+%F0%9F%9A%80" alt="AmyraxVPN Relay" />

<br>

<img src="https://img.shields.io/badge/Netlify-Edge_Function-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
<img src="https://img.shields.io/badge/Runtime-Deno-000000?style=for-the-badge&logo=deno&logoColor=white" />
<img src="https://img.shields.io/badge/Version-v3-FF6B6B?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" />

<br><br>

<a href="https://t.me/AmyraxVPN"><img src="https://img.shields.io/badge/AmyraxVPN-Channel-2CA5E0?style=flat-square&logo=telegram&logoColor=white" /></a>
&nbsp;
<a href="https://t.me/AmyraxConfig"><img src="https://img.shields.io/badge/AmyraxConfig-Channel-229ED9?style=flat-square&logo=telegram&logoColor=white" /></a>

</div>

---

<div align="center">

## ⬇️ دانلود

<br>

<a href="https://github.com/AmyraxVPN-Main/AmyraxVPN-RELAY/releases/latest">
  <img src="https://img.shields.io/badge/📦_دانلود_آخرین_نسخه-Download_Latest_Release-00C7B7?style=for-the-badge" />
</a>

<br><br>

<i>همیشه آخرین نسخه رو دانلود کن — فایل <code>.zip</code> رو از قسمت Assets بردار</i>

</div>

---

## 🚀 راهنمای دیپلوی — گام به گام

<br>

### مرحله ۱ — ساخت اکانت Netlify

> [!TIP]
> برای ساخت اکانت‌های نامحدود، از سرویس ایمیل موقت **atomicmail.io** استفاده کن

<br>

<div align="center">

<a href="https://atomicmail.io"><img src="https://img.shields.io/badge/ایمیل_موقت-atomicmail.io-6366f1?style=for-the-badge" /></a>
&nbsp;
<a href="https://app.netlify.com/signup"><img src="https://img.shields.io/badge/ساخت_اکانت-Netlify-00C7B7?style=for-the-badge&logo=netlify" /></a>

</div>

<br>

| قدم | کار |
|:---:|:---|
| **۱** | وارد [atomicmail.io](https://atomicmail.io) شو — یه آدرس ایمیل موقت بهت میده |
| **۲** | اون ایمیل رو کپی کن و برو [app.netlify.com/signup](https://app.netlify.com/signup) |
| **۳** | با ایمیل ثبت‌نام کن — لینک تأیید رو از atomicmail چک کن |
| **۴** | اکانت Netlify آماده‌ست ✅ |

<br>

---

### مرحله ۲ — آماده‌سازی فایل‌ها

> [!NOTE]
> فقط کافیه zip رو اکسترکت کنی — نیازی به هیچ تغییری نیست

<br>

فایل zip دانلود‌شده رو اکسترکت کن — پوشه‌ای با این ساختار میگیری:

```
AmyraxVPN-RELAY-v3/
├── netlify/
│   └── edge-functions/
│       └── relay.js
├── public/
│   └── index.html
└── netlify.toml
```

> [!IMPORTANT]
> همین پوشه `AmyraxVPN-RELAY-v3` رو آپلود میکنی — نه فایل zip رو

<br>

---

### مرحله ۳ — دیپلوی روی Netlify

<br>

| قدم | کار |
|:---:|:---|
| **۱** | وارد داشبورد Netlify شو → برو بخش **Sites** |
| **۲** | کلیک کن روی **Add new site** → بعد **Deploy manually** |
| **۳** | دکمه **Choose folder** رو بزن |
| **۴** | پوشه `AmyraxVPN-RELAY-v3` رو انتخاب کن |
| **۵** | صبر کن — دیپلوی چند ثانیه طول میکشه |
| **۶** | بعد از اتمام، یه دامنه بهت میده مثل `random-name-123.netlify.app` ✅ |

<br>

---

### مرحله ۴ — دریافت کانفیگ

دامنه‌ای که Netlify بهت داد رو **توی مرورگر باز کن:**

```
https://random-name-123.netlify.app
```

**صفحه Config Generator بالا میاد** — دامنه‌ات رو وارد کن تا کانفیگ آماده برات جنریت بشه 🎉

<br>

---

## 📋 خلاصه کامل

<div align="center">

<br>

| مرحله | کار | نتیجه |
|:---:|:---|:---:|
| ☁️ **۱** | از atomicmail.io یه ایمیل موقت بگیر | ایمیل آماده |
| 🔑 **۲** | توی Netlify با اون ایمیل اکانت بساز | اکانت آماده |
| 📦 **۳** | آخرین نسخه رو دانلود و اکسترکت کن | پوشه آماده |
| 🚀 **۴** | پوشه رو توی Netlify دیپلوی کن | دامنه آماده |
| ✅ **۵** | دامنه رو باز کن | کانفیگ جنریت میشه |

</div>

<br>

---

## ❓ سوالات متداول

<details>
<summary><b>چرا atomicmail؟</b></summary>
<br>
Netlify برای هر اکانت یه دامنه رایگان میده. با atomicmail.io میتونی بدون نیاز به ایمیل واقعی، اکانت‌های نامحدود بسازی و دامنه‌های بیشتری داشته باشی.
</details>

<details>
<summary><b>آیا نیاز به نصب چیزی هست؟</b></summary>
<br>
نه — فقط یه مرورگر کافیه. همه چیز از طریق سایت Netlify انجام میشه.
</details>

<details>
<summary><b>دیپلوی چقدر طول میکشه؟</b></summary>
<br>
معمولاً کمتر از ۳۰ ثانیه — بعد از اتمام، دامنه فوری آماده‌ست.
</details>

<details>
<summary><b>اگه دامنه فیلتر شد چیکار کنم؟</b></summary>
<br>
یه اکانت جدید بساز (با ایمیل جدید از atomicmail) و دوباره دیپلوی کن — دامنه جدیدی میگیری.
</details>

---

<div align="center">

<br>

<img src="https://img.shields.io/badge/Made_with-❤️-ff6b6b?style=for-the-badge" />
<img src="https://img.shields.io/badge/By-Amyrax-00C7B7?style=for-the-badge" />

<br><br>

<a href="https://t.me/AmyraxVPN"><img src="https://img.shields.io/badge/AmyraxVPN-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" /></a>
&nbsp;
<a href="https://t.me/AmyraxConfig"><img src="https://img.shields.io/badge/AmyraxConfig-229ED9?style=for-the-badge&logo=telegram&logoColor=white" /></a>

<br><br>

<i>این پروژه تحت لایسنس MIT منتشر شده</i>

</div>

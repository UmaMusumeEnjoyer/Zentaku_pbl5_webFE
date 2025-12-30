# Cấu hình Đa ngôn ngữ (i18n) - pbl5_webFE

## 📁 Cấu trúc folder

```
src/
  i18n/
    config.ts          ← File cấu hình i18next (SỬ DỤNG SHARED-LOGIC)
```

## 🔍 Giải thích cấu hình

### ✅ **ĐANG SỬ DỤNG: Translations từ thư viện shared-logic**

File `config.ts` hiện tại **KHÔNG sử dụng file translations local** mà **import trực tiếp từ thư viện `@umamusumeenjoyer/shared-logic`**.

### Cách hoạt động:

1. **Import translations từ shared-logic:**
   ```typescript
   import {
     commonEn,      // Từ shared-logic/src/shared/i18n/locales/en/common.json
     homePageEn,    // Từ shared-logic/src/shared/i18n/locales/en/HomePage.json
     commonVi,      // Từ shared-logic/src/shared/i18n/locales/vi/common.json
     homePageVi,    // Từ shared-logic/src/shared/i18n/locales/vi/HomePage.json
     commonJp,      // Từ shared-logic/src/shared/i18n/locales/jp/common.json
     homePageJp,    // Từ shared-logic/src/shared/i18n/locales/jp/HomePage.json
     LANGUAGES,     // ['vi', 'en', 'jp']
     DEFAULT_LANG,  // 'en'
     DEFAULT_NS,    // 'common'
   } from '@umamusumeenjoyer/shared-logic';
   ```

2. **Các ngôn ngữ được hỗ trợ:**
   - 🇬🇧 English (en)
   - 🇻🇳 Tiếng Việt (vi)
   - 🇯🇵 日本語 (jp)

3. **Namespaces:**
   - `common`: Các từ chung như buttons, footer, loading...
   - `HomePage`: Nội dung riêng cho trang chủ

## 🎯 Lợi ích của việc sử dụng shared-logic:

### ✅ Ưu điểm:
- **Tập trung hóa**: Tất cả translations được quản lý ở một nơi (thư viện shared-logic)
- **Nhất quán**: Đảm bảo các frontend apps khác nhau sử dụng cùng bản dịch
- **Dễ bảo trì**: Chỉ cần sửa translations ở shared-logic, tất cả apps đều cập nhật
- **Giảm trùng lặp**: Không cần copy-paste translations giữa các projects

### ❌ KHÔNG cần folder locales/ local:
- Không cần tạo `src/i18n/locales/en/`, `src/i18n/locales/vi/`, etc.
- Tất cả translations nằm trong `shared-logic/src/shared/i18n/locales/`

## 📝 Cách sử dụng trong components:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation(['HomePage', 'common']);
  
  return (
    <div>
      <h1>{t('HomePage:hero.title')}</h1>
      <button>{t('common:buttons.sign_up')}</button>
    </div>
  );
};
```

## 🔄 Cách thay đổi ngôn ngữ:

Component `LanguageSwitcher` đã tự động import `LANGUAGES` từ config:
```tsx
import { LANGUAGES } from '../../i18n/config';
```

Người dùng có thể chuyển đổi giữa 3 ngôn ngữ và lựa chọn được lưu vào `localStorage`.

## 🛠️ Khi nào cần cập nhật translations?

**Trả lời**: Sửa trực tiếp trong thư viện `shared-logic`:
- Vào folder: `shared-logic/src/shared/i18n/locales/`
- Sửa file JSON tương ứng (en/, vi/, jp/)
- Build lại shared-logic: `npm run build`
- Cập nhật package trong pbl5_webFE (nếu cần)

## 🚀 Setup hoàn chỉnh:

File `App.tsx` đã import config:
```tsx
import './i18n/config'; // Import i18n configuration
```

Vậy là tất cả đã sẵn sàng! 🎉

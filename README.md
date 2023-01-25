# react-hook-form-zod

## Getting Started

### Installation

```bash
npm install @buysell-technologies/react-hook-form-zod
```

## Usage

```tsx
import { createZodForm } from '@buysell-technologies/react-hook-form-zod';

// ✅ 型引数の設定が不要
// createZodForm を用いると、型引数が設定された useForm を取得できる
const useForm = createZodForm(schema);
const { handleParsed } = useForm();

const onSubmit = handleParsed((data) => {
  // ✅ data の実態と Data の型が一致している
  type Data = typeof data // { fullName: "..." }
  console.log(data); // { fullName: "..." }
});
```
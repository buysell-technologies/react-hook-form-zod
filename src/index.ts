import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
  DeepPartial,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export type HandleParsed<T extends z.Schema<any, any>> = (
  onValid: SubmitHandler<z.output<T>>,
  onInvalid?: SubmitErrorHandler<DeepPartial<z.input<T>>>
) => (e?: React.BaseSyntheticEvent) => Promise<void>;

export type UseZodFormProps<
  T extends z.Schema<any, any>,
  TContext = any
> = Omit<UseFormProps<DeepPartial<z.input<T>>, TContext>, "resolver">;

export type UseZodFormReturn<
  T extends z.Schema<any, any>,
  TContext = any
> = UseFormReturn<DeepPartial<z.input<T>>, TContext> & {
  handleParsed: HandleParsed<T>;
};

export const createZodForm =
  <T extends z.Schema<any, any>>(schema: T) =>
  <TContext = any>(
    props?: UseZodFormProps<T, TContext>
  ): UseZodFormReturn<T, TContext> => {
    const resolver = zodResolver(schema, undefined, {
      rawValues: true,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const methods = useForm({ resolver, ...props });

    const handleParsed: HandleParsed<T> = (onValid, onInvalid) => {
      const handleValid: SubmitHandler<DeepPartial<z.input<T>>> = (
        data,
        error
      ) => {
        const parsedData = schema.parse(data);
        return onValid(parsedData, error);
      };

      return methods.handleSubmit(handleValid, onInvalid);
    };

    return { ...methods, handleParsed };
  };
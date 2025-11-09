'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, className, ...props }) {
        // Check if this is a success toast based on className
        const isSuccessToast = className?.includes('green-500');
        
        return (
          <Toast 
            key={id} 
            {...props} 
            className={className}
            variant={isSuccessToast ? undefined : props.variant}
          >
            <div className="grid gap-2 flex-1">
              {title && (
                <ToastTitle className={isSuccessToast ? "text-green-200 font-bold text-base flex items-center gap-2" : ""}>
                  {isSuccessToast && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    </motion.div>
                  )}
                  <span>{title}</span>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={isSuccessToast ? "text-green-50/95 mt-0.5 leading-relaxed text-sm pl-7" : ""}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

import { useChangeCase } from '@vueuse/integrations/useChangeCase';

export const toCapitalCase = (text: string) => useChangeCase(text, 'capitalCase').value;

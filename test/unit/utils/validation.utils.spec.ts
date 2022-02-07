import { UtilsValidations } from '../../../src/utils/validation.utils';

describe('Test UtilsValidations', () => {
  it('should return that CPF is valid', () => {
    const cpf = '658.009.180-07';

    const isValidCPF = UtilsValidations.isCnpj(cpf);

    expect(isValidCPF).toBe(true);
  });

  it('should return that CPF is invalid', () => {
    const cpf = 'xxx.xxx.xxx-xx';

    const isValidCPF = UtilsValidations.isCnpj(cpf);

    expect(isValidCPF).toBe(false);
  });

  it('should return that CNPJ is valid', () => {
    const cnpj = '02.979.482/0001-07';

    const isValidCNPJ = UtilsValidations.isCnpj(cnpj);

    expect(isValidCNPJ).toBe(true);
  });

  it('should return that CNPJ is invalid', () => {
    const cnpj = 'xx.xxx.xxx/xxxx-xx';

    const isValidCNPJ = UtilsValidations.isCnpj(cnpj);

    expect(isValidCNPJ).toBe(false);
  });
});

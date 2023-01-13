import { constructRouteMap } from '../../../../src/core/parser/base';
import { routesConfig } from '../routesConfig';
import { baseOutputExpectedResult } from './base.expectedResult';

describe('It should generate the correct output with a defined schema', () => {
  it('should generate the correct ouput', () => {
    // Given
    const output = constructRouteMap(routesConfig);

    // Then

    expect(output).toMatchObject(baseOutputExpectedResult);
  });
});

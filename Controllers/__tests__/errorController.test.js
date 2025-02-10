const errorController = require('../errorController');

test('should handle errors correctly', () => {
	expect(errorController.handleError(new Error('Test error'))).toBe('Handled: Test error');
});

test('should return default error message for unknown errors', () => {
	expect(errorController.handleError(new Error())).toBe('Handled: Unknown error');
});
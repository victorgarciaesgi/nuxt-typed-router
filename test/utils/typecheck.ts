// Check required param
export function required(arg: string) {}

// Check optional param
export function optional<T>(arg: undefined extends T ? T : never) {}

// Check array params
export function array(arg: string[]) {}

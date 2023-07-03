function isOperator(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

function getPrecedence(operator: string): number {
  if (operator === '+' || operator === '-') {
    return 1;
  } else if (operator === '*' || operator === '/') {
    return 2;
  }
  return 0;
}

function applyOperator(operator: string, operand1: number, operand2: number): number {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    default:
      return 0;
  }
}

export default function evaluateExpression(expression: string): number | string | Error {
  const stack: string[] = [];
  const postfix: (number | string)[] = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === ' ') {
      continue;
    } else if (isOperator(char)) {
      while (
        stack.length > 0 &&
        isOperator(stack[stack.length - 1]) &&
        getPrecedence(stack[stack.length - 1]) >= getPrecedence(char)
      ) {
        postfix.push(stack.pop()!);
      }
      stack.push(char);
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfix.push(stack.pop()!);
      }
      stack.pop(); // 弹出 '('
    } else {
      let operand = '';
      while (i < expression.length && !isOperator(expression[i]) && expression[i] !== '(' && expression[i] !== ')') {
        operand += expression[i++];
      }
      i--; // 回退一个字符
      postfix.push(parseFloat(operand));
    }
  }

  while (stack.length > 0) {
    postfix.push(stack.pop()!);
  }

  const resultStack: number[] = [];

  for (let i = 0; i < postfix.length; i++) {
    const token = postfix[i];

    if (typeof token === 'number') {
      resultStack.push(token);
    } else if (isOperator(token)) {
      const operand2 = resultStack.pop()!;
      const operand1 = resultStack.pop()!;
      const result = applyOperator(token, operand1, operand2);
      resultStack.push(result);
    }
  }

  if (resultStack.length === 1 && typeof resultStack[0] === 'number' && isFinite(resultStack[0])) {
    return resultStack[0];
  } else {
    return new Error('Invalid expression');
  }
}

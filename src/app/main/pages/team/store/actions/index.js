export * from './products.actions';
export * from './product.actions';
export * from './orders.actions';
export * from './order.actions';


export const HIDE_MESSAGE = '[MESSAGE] CLOSE';
export const SHOW_MESSAGE = '[MESSAGE] SHOW';

export function hideMessage()
{
    return {
        type: HIDE_MESSAGE
    }
}

export function showMessage(options)
{
    return {
        type: SHOW_MESSAGE,
        options
    }
}


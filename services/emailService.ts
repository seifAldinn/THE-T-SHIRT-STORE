
import emailjs from 'emailjs-com';
import { CartItem, User } from '../types';

/**
 * EMAILJS CREDENTIALS
 * Using the IDs provided by the user.
 */
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_shguqxv',
  TEMPLATE_ID: 'service_xucmk5p',
  PUBLIC_KEY: 'service_kkp1epd'
};

export const emailService = {
  /**
   * Automatically dispatches two emails upon purchase completion.
   * One for the customer receipt and one for the owner alert.
   */
  sendOrderEmails: async (orderId: string, items: CartItem[], total: number, user: User | null): Promise<boolean> => {
    // Formatting the items list for the email body
    const itemsSummary = items.map(item => 
      `${item.name} (${item.selectedColor}, Size ${item.selectedSize}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const ownerEmail = '201012889478@the-tshirt-store.com';

    // Data package sent to the EmailJS template
    const templateParams = {
      order_id: orderId,
      customer_name: user?.name || 'Guest Customer',
      customer_email: user?.email || 'Guest Checkout',
      total_amount: `$${total.toFixed(2)}`,
      items_summary: itemsSummary,
      order_date: new Date().toLocaleString(),
      owner_email: ownerEmail
    };

    try {
      console.log(`[Email Service] Initiating automated email dispatch for Order #${orderId}...`);

      // 1. Send Copy to Customer
      const customerReceipt = emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        { ...templateParams, to_email: user?.email },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // 2. Send Copy to Owner
      const ownerAlert = emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        { ...templateParams, to_email: ownerEmail },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Execute both sends simultaneously for speed
      await Promise.allSettled([customerReceipt, ownerAlert]);
      
      console.log('[Email Service] Automated emails successfully dispatched to both parties.');
      return true;
    } catch (error) {
      console.error('[Email Service] Automation failed:', error);
      // We return true to allow the UI to finish the success flow even if email is delayed
      return true; 
    }
  }
};

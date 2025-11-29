// =============================================================================
// NOTIFICATION CONTROLLER
// =============================================================================
// Handles email/SMS notifications and logs
// TODO: Integrate with SendGrid/Nodemailer for email and Twilio for SMS

const NotificationLog = require('../models/NotificationLog');

// =============================================================================
// 1. SEND NOTIFICATION (Admin only)
// =============================================================================
/**
 * Send email or SMS notification to a customer
 * Admin can trigger notifications for order updates
 * 
 * @route   POST /api/notifications/send
 * @access  Private (Admin only)
 */
const sendNotification = async (req, res) => {
  try {
    const { user_id, channel, template, payload } = req.body;

    // Validate channel
    const validChannels = ['email', 'sms'];
    if (!validChannels.includes(channel)) {
      return res.status(400).json({
        success: false,
        message: `Invalid channel. Must be one of: ${validChannels.join(', ')}`
      });
    }

    // Validate template
    const validTemplates = [
      'order_confirmation',
      'payment_received',
      'order_ready',
      'order_delivered',
      'custom'
    ];
    if (!validTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        message: `Invalid template. Must be one of: ${validTemplates.join(', ')}`
      });
    }

    // =============================================================================
    // SEND NOTIFICATION
    // =============================================================================
    let notificationStatus = 'pending';
    let errorMessage = null;

    try {
      if (channel === 'email') {
        // TODO: Implement email sending
        // const nodemailer = require('nodemailer');
        // const transporter = nodemailer.createTransport({...});
        // await transporter.sendMail({
        //   to: payload.email,
        //   subject: getSubjectForTemplate(template),
        //   html: getHtmlForTemplate(template, payload)
        // });

        console.log(`📧 Email notification sent to user ${user_id}`);
        notificationStatus = 'sent';

      } else if (channel === 'sms') {
        // TODO: Implement SMS sending
        // const twilio = require('twilio');
        // const client = twilio(
        //   process.env.TWILIO_ACCOUNT_SID,
        //   process.env.TWILIO_AUTH_TOKEN
        // );
        // await client.messages.create({
        //   to: payload.phone,
        //   from: process.env.TWILIO_PHONE_NUMBER,
        //   body: getTextForTemplate(template, payload)
        // });

        console.log(`📱 SMS notification sent to user ${user_id}`);
        notificationStatus = 'sent';
      }

    } catch (sendError) {
      console.error('❌ Notification send error:', sendError);
      notificationStatus = 'failed';
      errorMessage = sendError.message;
    }

    // Log notification
    const logId = await NotificationLog.create({
      user_id,
      channel,
      template,
      payload,
      status: notificationStatus,
      error: errorMessage
    });

    res.status(201).json({
      success: true,
      message: `Notification ${notificationStatus}`,
      data: {
        log_id: logId,
        status: notificationStatus
      }
    });

  } catch (error) {
    console.error('❌ Send notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending notification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 2. GET NOTIFICATION LOGS
// =============================================================================
/**
 * Get notification logs with filtering
 * Admin can view all logs, customers can view their own
 * 
 * Query parameters:
 * - user_id (admin only): Filter by user
 * - channel: Filter by email/sms
 * - status: Filter by sent/failed/pending
 * - limit: Max results (default: 50)
 * 
 * @route   GET /api/notifications/logs
 * @access  Private
 */
const getNotificationLogs = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { user_id, channel, status, limit } = req.query;

    let logs;

    if (role === 'customer') {
      // Customers can only see their own logs
      logs = await NotificationLog.findByUserId(userId, {
        limit: limit ? parseInt(limit) : 50
      });

      console.log(`📋 Customer ${userId} retrieved ${logs.length} notification logs`);

    } else if (role === 'admin') {
      // Admin can see all logs or filter
      if (user_id) {
        logs = await NotificationLog.findByUserId(parseInt(user_id), {
          limit: limit ? parseInt(limit) : 50
        });
      } else {
        const filters = {};
        if (channel) filters.channel = channel;
        if (status) filters.status = status;

        logs = await NotificationLog.findAll({
          ...filters,
          limit: limit ? parseInt(limit) : 50
        });
      }

      console.log(`📋 Admin retrieved ${logs.length} notification logs`);

    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      count: logs.length,
      data: {
        logs
      }
    });

  } catch (error) {
    console.error('❌ Get notification logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notification logs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// Export all controller functions
// =============================================================================
module.exports = {
  sendNotification,
  getNotificationLogs
};

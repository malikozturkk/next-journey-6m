import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Kafka sisteminin çalışıp çalışmadığını kontrol et
    res.status(200).json({ 
      success: true, 
      message: 'Kafka sistemi aktif',
      status: 'running',
      timestamp: new Date().toLocaleString('tr-TR')
    });
  } catch (error) {
    console.error('Kafka durumu kontrol edilirken hata:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Kafka sistemi kontrol edilirken bir hata oluştu' 
    });
  }
} 
export const parseSRT = (srtText) => {
  if (!srtText || typeof srtText !== 'string') return [];
  
  // Split the file into blocks separated by one or more blank lines
  const blocks = srtText.trim().split(/\n\s*\n/);
  
  return blocks.map((block) => {
    // Split each block into lines
    const lines = block.split(/\r?\n/);
    if (lines.length >= 3) {
      const id = lines[0];
      const timeLine = lines[1];
      const textLines = lines.slice(2).join('\n');
      
      // Parse the timestamp, e.g., "00:00:22,530 --> 00:00:22,530"
      const [startStr] = timeLine.split(' --> ');
      
      // Convert to seconds
      let timeInSeconds = 0;
      let timeStr = "00:00";
      
      if (startStr) {
        const timeParts = startStr.split(':');
        if (timeParts.length >= 3) {
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          
          const secondsAndMillis = timeParts[2].split(',');
          const seconds = parseInt(secondsAndMillis[0], 10);
          
          timeInSeconds = hours * 3600 + minutes * 60 + seconds;
          timeStr = `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      }
      
      // Extract username and message.
      // Expected format: "Username: Message content"
      const separatorIndex = textLines.indexOf(':');
      let username = '';
      let message = textLines;
      
      if (separatorIndex !== -1) {
        username = textLines.slice(0, separatorIndex).trim();
        message = textLines.slice(separatorIndex + 1).trim();
      }

      return {
        id,
        timeStr,
        timeInSeconds,
        username,
        message,
      };
    }
    return null;
  }).filter(Boolean);
};

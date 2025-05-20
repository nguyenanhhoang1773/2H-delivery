// components/ChatwootWidget.js
import React from 'react';
import { WebView } from 'react-native-webview';

const ChatwootWidget = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Chatwoot</title>
      </head>
      <body>
        <script>
          (function(d,t) {
            var BASE_URL="https://app.chatwoot.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'kQAk8bB4zrVQCgAfWLKXLWu5',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      javaScriptEnabled
      domStorageEnabled
      style={{ flex: 1 }}
    />
  );
};

export default ChatwootWidget;

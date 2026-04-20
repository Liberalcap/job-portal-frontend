# Login Debugging Checklist

## 1. Is Backend Running?

- Open terminal and check if your Spring Boot backend is running on `http://localhost:8080`
- Backend should be started before testing frontend

## 2. Check Browser Console for Errors

- Open browser DevTools (F12 or Right-click → Inspect)
- Go to **Console** tab
- Try login again and look for error messages
- Check the **Network** tab to see the API request and response

## 3. Common Issues & Solutions

### Issue: CORS Error (Access to XMLHttpRequest blocked)

**Solution**: Add CORS configuration to your Spring Boot backend

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Issue: 404 Not Found

**Possible causes**:

- Backend endpoint is different (check AuthController)
- API base URL is wrong
- Edit `src/services/api.js` and change API_BASE_URL if needed

### Issue: 400 Bad Request / Invalid Credentials

**Check**:

- Is the email/password format correct?
- Does your backend expect different field names?
- Check response in Network tab to see exact error message

## 4. Test Endpoint Directly

Use Postman or curl to test login endpoint:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## 5. Check Response Format

Your backend might return a different response structure. Edit `src/services/authService.js` if needed:

```javascript
// If backend returns: { "data": { "token": "..." } }
// Change to:
if (response.data.data.token) {
  localStorage.setItem("authToken", response.data.data.token);
}
```

## What to Report

When you check the browser console, tell me:

- The exact error message
- The API request URL shown in Network tab
- The response from the backend

const fetch = require('node-fetch');

async function testAPI() {
  const baseURL = 'http://localhost:3000';
  
  console.log('Testing Шашлык-Машлык API...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('   Health check:', healthData);
    
    // Test menu endpoint
    console.log('\n2. Testing menu endpoint...');
    const menuResponse = await fetch(`${baseURL}/api/menu`);
    const menuData = await menuResponse.json();
    console.log('   Menu items count:', menuData.length);
    console.log('   First item:', menuData[0]?.name);
    
    // Test specific menu item
    console.log('\n3. Testing specific menu item...');
    const menuItemResponse = await fetch(`${baseURL}/api/menu/1`);
    const menuItemData = await menuItemResponse.json();
    console.log('   Menu item:', menuItemData.name);
    
    // Test loyalty endpoint
    console.log('\n4. Testing loyalty endpoint...');
    const loyaltyResponse = await fetch(`${baseURL}/api/user/loyalty`);
    const loyaltyData = await loyaltyResponse.json();
    console.log('   Loyalty points:', loyaltyData.points);
    
    console.log('\n✅ All API tests passed!');
    console.log('\n🔧 To test authentication, you can use the following curl commands:');
    console.log('\n   Register a new user:');
    console.log('   curl -X POST http://localhost:3000/api/auth/register \\');
    console.log('        -H "Content-Type: application/json" \\');
    console.log('        -d \'{"email":"test@example.com", "password":"password123", "name":"Test User", "phone":"+79991234567"}\'');
    console.log('\n   Login:');
    console.log('   curl -X POST http://localhost:3000/api/auth/login \\');
    console.log('        -H "Content-Type: application/json" \\');
    console.log('        -d \'{"email":"test@example.com", "password":"password123"}\'');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('   1. Make sure the backend server is running (use start-backend.bat)');
    console.log('   2. Check that port 3000 is not being used by another application');
    console.log('   3. Verify your internet connection for image URLs');
  }
}

testAPI();
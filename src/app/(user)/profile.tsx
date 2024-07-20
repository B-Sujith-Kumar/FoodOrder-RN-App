import { View, Text } from 'react-native'
import React from 'react'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button text="Sign Out" onPress={async () => await supabase.auth.signOut()} />
    </View>
  ) 
}

export default ProfileScreen
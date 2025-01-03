import React from 'react';
import { Flex, Tabs, Text } from '@chakra-ui/react';
import { FaRegBell } from 'react-icons/fa6';
import AllNotifications from './components/AllNotifications';

const Notifications = () => {
  return (
    <Flex
      flexDir="column"
      lgDown={{ p: 5 }}
      lg={{ px: 28, py: 12 }}
      xl={{ px: 32, py: 12 }}
    >
      <Text
        textAlign={{ base: 'center', md: 'left' }}
        fontSize="3xl"
        fontWeight="bold"
        mb={5}
      >
        Notifications
      </Text>
      <Tabs.Root
        variant="outline"
        defaultValue="notifications"
        lazyMount
        unmountOnExit
        colorPalette="teal"
      >
        <Tabs.List>
          <Tabs.Trigger
            _selected={{
              fontWeight: 'bold',
              borderTopColor: 'gray.500',
              borderLeftColor: 'gray.500',
              borderRightColor: 'gray.500',
            }}
            value="notifications"
          >
            <FaRegBell />
            Notifications
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content h="calc(100vh - 300px)" value="notifications">
          <AllNotifications />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default Notifications;

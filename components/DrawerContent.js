// components/DrawerContent.js

import * as React from "react";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={{ flex: 1 }}>
        <Drawer.Section>
          <DrawerItemList {...props} />
        </Drawer.Section>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

import { ProductModel } from "@/features/home/screens/home_screen";
import { ProfileModel } from "@/features/profile/profile_screen";

export type RootParams = {
  SplashRoute: undefined;
  OnBoardingRoute: undefined;
  LoginRoute: undefined;
  RegisterRoute: undefined;
  RegisterSuccessRoute: undefined;
  MainTabs: undefined;
  HomeRoute: undefined;
  ProfileRoute: undefined;
  CartRoute: undefined;
  CategoryRoute: undefined;
  SearchRoute: undefined;
  MyAccountRoute: ProfileModel;
  FavoritesRoute: undefined;
  OrderHistoryRoute: undefined;
  HelpCenterRoute: undefined;
  ProductDetailsRoute: ProductModel;
};

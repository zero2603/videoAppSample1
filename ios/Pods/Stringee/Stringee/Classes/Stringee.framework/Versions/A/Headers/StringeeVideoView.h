//
//  StringeeVideoView.h
//  Stringee
//
//  Created by HoangDuoc on 6/16/20.
//  Copyright © 2020 Hoang Duoc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <UIKit/UIKit.h>

@interface StringeeVideoView : UIView

@property (nonatomic) AVCaptureSession *captureSession;

@end


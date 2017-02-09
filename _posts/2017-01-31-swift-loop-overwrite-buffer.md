I am working on a dashcam-like application developed in Swift3 on iOS 10. In order to record continuously, video frames (laboriously copied from a buffer pool) from the camera were stored in the phone's working memory. Unfortunately, being an iOS application, the size of available memory is limited. Thus we had to find a solution that would allow us to store the last N entries while allowing asynchronous O(1) write time.

Here is a solution I came up with.

```swift
import Foundation
import AVFoundation

// The 🍙 is a generic type. A good use for emojis in code?
final public class LoopOverwriteBuffer<🍙> {
	fileprivate var data: [🍙?]
	public var size: Int {
		get {
			return data.count
		}
	}

	fileprivate var index: Int = 0

	// This is the key to the function of the buffer. It allows for operations to be queued and done in a sequential order.
	fileprivate let accessQueue = DispatchQueue(label: "com.benespey.loopOverwriteBufferAccessQueue", attributes: [])
	
	public var isEmpty: Bool {
		get {
			return data.isEmpty
		}
	}

	init(size: Int) {
		data = [🍙?](repeating: nil, count: size)
	}
	
	/**
	Writes the given element to the next space in the buffer, overwriting if necessary.
	
	- parameter element:	Element to be written
	*/
	public func write(_ element: 🍙) {
		accessQueue.async {
			self.data[self.index % self.data.count] = element
			self.index += 1
		}
	}
	
	/**
	Reads the entire buffer
	
	- returns: A array with the contents of the buffer in order
	*/
	public func readAll() -> [🍙] {
		var arrayCopy = [🍙]()
		accessQueue.sync(flags: .barrier, execute: {
			for i in 0..<self.data.count {
				if let element = self.data[(i + self.index) % self.data.count] {
					arrayCopy.append(element)
				}
			}
		}) 
		return arrayCopy
	}
	
	public func clear() {
		Log.info("Clearing buffer")
		accessQueue.async {
			for i in 0..<self.data.count {
				self.data[i] = nil
			}
			self.index = 0
		}
	}

}
```

An integer stores the current write index of the array, which is accessed by (index mod data.size). Since index is always increasing, it could *potentially theoretically* overflow. However since there are 2147483647 available values / 30 possible values per second (max fps of iOS camera) = 71582788 seconds = 829 days.

I think we have nothing to worry about in the operational lifetime of the app.
